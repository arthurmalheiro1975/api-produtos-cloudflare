/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx) {

        const url = new URL(request.url)

        if(request.method === "POST" && url.pathname === "/produtos"){
            const body = await request.json()

            const {
                nome,
                descricao,
                categoria,
                preco,
                imagem
            } = body

            const resultado = await env.DB.prepare(
                `INSERT INTO 
                produtos(nome,descricao,categoria,preco,imagem)
                VALUES(?,?,?,?,?)
                `
            ).bind(
                nome,
                descricao,
                categoria,
                preco,
                imagem
            ).run()

            return Response.json({
                mensagem:"Produto cadastrado com sucesso!",
                id:resultado.meta.last_row_id
            })
        }
            return Response.json({
                mensagem: "API de produtos funcionando"
            })
    },
};