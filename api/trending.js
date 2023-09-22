export const config = {
    runtime: "edge",
};

var PATH = "/trending/all/day?language=enUs";
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
    console.log(s);
    console.log(p);
    const r = await fetch(p, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    });
    console.log(r);
    if (!r.ok) {
        return new Response("Bad request", {status: 404});
    }
    return new Response(r.body, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        }
    });

}
