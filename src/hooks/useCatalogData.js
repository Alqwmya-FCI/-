import { useState, useEffect } from 'react';
import { productsData } from '../data/productsData';
import { fetchCatalogFromDB } from '../utils/supabaseClient';

let cachedCatalog = null;

export const useCatalogData = () => {
    const [catalog, setCatalog] = useState(cachedCatalog || productsData);
    const [isLoading, setIsLoading] = useState(!cachedCatalog);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            if (cachedCatalog) {
                setCatalog(cachedCatalog);
                setIsLoading(false);
                return;
            }

            const dbCatalog = await fetchCatalogFromDB();
            if (isMounted) {
                if (dbCatalog && Object.keys(dbCatalog).length > 0) {
                    cachedCatalog = dbCatalog;
                    setCatalog(dbCatalog);
                } else {
                    setCatalog(productsData);
                }
                setIsLoading(false);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { catalog, isLoading };
};

export const getCategoryTabs = (catalog) => {
    const source = catalog || productsData;
    return Object.keys(source).map(key => ({
        id: key,
        title: source[key]?.title || key
    }));
};
