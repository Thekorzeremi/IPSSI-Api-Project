import ky from "ky";

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  hooks: {
    beforeError: [
      async (err) => {
        const body = await err.response.json().catch(() => ({}));
        err.message = body.message ?? "Erreur serveur.";
        return err;
      },
    ],
    afterResponse: [
      async (_req, _opts, res) => {
        const json = await res.json();
        return Response.json(json.data, { status: res.status, headers: res.headers });
      },
    ],
  },
});

export const authLogin = (email, password) =>
  api.post("auth/login", { json: { email, password } }).json();

export const authRegister = (username, email, password, newsletter) =>
  api
    .post("auth/register", {
      json: { username, email, password, settings: { newsletter } },
    })
    .json();
