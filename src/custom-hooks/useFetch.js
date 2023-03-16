import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }, [url])

    const refetch = () => { 
        setIsLoading(true);
        axios.get(url)
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }

    return {isLoading, error, data, refetch}
}
