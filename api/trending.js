import _utils from "./_utils.js";

if (!process.env.API_KEY || !process.env.API_URL) {
    throw Error("Missing env variables");
}

export const config = {
    runtime: "edge",
};

var PATH = "/trending/all/day";
var SEARCH = "lenguage=enUs";

export default async function handler(req) {
    var url = new URL(req.url);
    var p = `${process.env.API_URL}${PATH}`;
    var s = url.search;
    if (s.length === 0) {
        p = `${p}?${SEARCH}`;
    } else {
        p = `${p}${s}&${SEARCH}`;
    }
    const r = await fetch(p, _utils.FETCH_OPT);
    console.log(r);
    if (!r.ok) {
        return new Response("Bad request", _utils.RES_BAD_OPT);
    }
    return new Response(r.body, _utils.RES_OPT);

}
