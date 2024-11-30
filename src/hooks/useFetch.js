export const useFetch = () => {
    const fetchData = async (url, method, data) => {
        try {
            const options = {
                method,
                headers: new Headers({
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                }),
            };

            if (data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                const errorMessage = `Error ${response.status}: ${response.statusText}`;
                return { error: true, message: errorMessage };
            }

            const responseData = method !== "DELETE" ? await response.json() : null;

            return {
                error: false,
                message: `${method} realizado exitosamente`,
                data: responseData,
            };
        } catch (error) {
            return {
                error: true,
                message: `Ocurrió un error: ${error.message}`,
            };
        }
    };

    const getData = (url) => fetchData(url, "GET");
    const setData = (url, data) => fetchData(url, "POST", data);
    const updateData = (url, data) => fetchData(url, "PUT", data);
    const deleteData = (url) => fetchData(url, "DELETE");

    return {
        getData,
        setData,
        updateData,
        deleteData,
    };
};
