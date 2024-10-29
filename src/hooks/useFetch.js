import React, { useEffect, useState } from 'react';

const useFetch = (url, metodo = 'GET', body = null) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    const initState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            initState();
            try {
                const options = {
                    method: metodo,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    ...(body && { body: JSON.stringify(body) }), // Agrega el body si existe
                };

                const response = await fetch(url, options);
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setState({
                    data,
                    isLoading: false,
                    hasError: false,
                    error: null,
                });
            } catch (error) {
                setState({
                    data: null,
                    isLoading: false,
                    hasError: true,
                    error: {
                        message: error.message,
                    },
                });
            }
        };

        fetchData();
    }, [url, metodo, body]); // Re-executa cuando cambian url, metodo o body

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        error: state.error,
    };
};

export default useFetch;
