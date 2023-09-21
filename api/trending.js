if (!process.env.API_KEY || !process.env.API_URL) {
    throw Error("Missing env variables");
}

const config = {
    runtime: "edge"
};

function fetchReturn(data) {
    if (data.ok) {
        return new Response(data.body, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        });
    } else {
        return new Response("Bad request", {status: 404});
    }
}

function handler(req) {
    const PATH = "/trending/all/day?language=enUs";
    const SEARCH="lenguage=enUs";

    var url = new URL(req.url);
    var path = `${process.env.API_URL}${PATH}`;
    var search = url.search;
    if (search.length === 0) {
        path = `${path}?${SEARCH}`;
    } else {
        path = `${path}${search}&${SEARCH}`;
    }
    return fetch(path, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    }).then(fetchReturn);
}

export default handler;
export {
    config
};
