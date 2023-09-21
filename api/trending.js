if (!process.env.API_KEY || !process.env.API_URL) {
    throw Error("Missing env variables");
}

const config = {
    runtime: "edge"
};

const OPTIONS = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`
    }
};

const PATH = "/trending/all/day?language=enUs";
const SEARCH="lenguage=enUs";

const badResponse = new Response("Bad request", {status: 404});

function fetchReturn(data) {
    if (data.ok) {
        return new Response(data.body, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        });
    } else {
        return badResponse;
    }
}

const url = new URL("a:0.a");

function handler(req) {
    url.href = req.url;
    var path = `${process.env.API_URL}${PATH}`;
    var search = url.search;
    if (search.length === 0) {
        path = `${path}?${SEARCH}`;
    } else {
        path = `${path}${search}&${SEARCH}`;
    }
    return fetch(path, OPTIONS).then(fetchReturn);
}

export default handler;
export {
    config
};
