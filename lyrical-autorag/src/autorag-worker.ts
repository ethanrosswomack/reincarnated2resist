export default {
	async fetch(request: Request, env: Env) {
		try {
			const url = new URL(request.url);
			const params = url.searchParams;

			// Required
			const query = params.get('query');
			if (!query) return new Response(JSON.stringify({ error: 'query is required' }), { status: 400 });

			// Optional params
			const model = params.get('model') || undefined;
			const rewrite_query = params.get('rewrite_query') === 'true';
			const max_num_results = params.get('max_num_results') ? Number(params.get('max_num_results')) : undefined;
			const stream = params.get('stream') === 'true';
			const score_threshold = params.get('score_threshold') ? Number(params.get('score_threshold')) : undefined;
			const folder = params.get('folder') || undefined;

			// Validate numeric ranges
			if (max_num_results && (max_num_results < 1 || max_num_results > 50)) {
				return new Response(JSON.stringify({ error: 'max_num_results must be 1..50' }), { status: 400 });
			}
			if (score_threshold && (score_threshold < 0 || score_threshold > 1)) {
				return new Response(JSON.stringify({ error: 'score_threshold must be 0..1' }), { status: 400 });
			}

			const ranking_options: any = {};
			if (score_threshold !== undefined) ranking_options.score_threshold = score_threshold;

			const filters: any = {};
			if (folder) filters.folder = folder;

			const autoragName = env.AUTORAG_INSTANCE || 'my-autorag';

			const body: any = {
				query,
				rewrite_query,
				max_num_results,
				ranking_options,
				filters,
				stream,
			};

			// Remove undefined keys
			Object.keys(body).forEach(k => body[k] === undefined && delete body[k]);

			// Call the cloudflare autorag search API exposed on env.AI
			// Note: env.AI must be configured via Cloudflare dashboard or wrangler deploy bindings
			const result = await env.AI.autorag(autoragName).search(body as any);

			return new Response(JSON.stringify(result), { status: 200, headers: { 'content-type': 'application/json' } });
		} catch (err: any) {
			return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
		}
	}
} satisfies ExportedHandler<Env>;
