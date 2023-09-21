if (!process.env.API_KEY || !process.env.API_URL) {
    throw Error("Missing env variables");
}

const config = {
    runtime: "edge"
};

async function handler(req) {
    var PATH = "/trending/all/day?language=enUs";
    var SEARCH = "lenguage=enUs";
    var url = new URL(req.url);

    var p = `${process.env.API_URL}${PATH}`;
    var s = url.search;
    if (s.length === 0) {
        p = `${p}?${SEARCH}`;
    } else {
        p = `${p}${s}&${SEARCH}`;
    }
    const r = await fetch(p, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    });
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

export default handler;
export {
    config
};
