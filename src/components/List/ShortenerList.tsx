import { useEffect, useState } from "react"
import { API_BASE_URL, DeleteUrl, GetUrlList } from "../../network/api";
import ShortenerForm from "../Form/ShortenerForm";
import { Url } from "../../types/Url";

export default function ShortenerList()
{
    const [urlList, setUrlList] = useState<Url[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchUrlList = async () => {
        try {
            const urls = await GetUrlList();
            setUrlList(urls.data); 
        }
        catch (error)
        {
            setError('Something went wrong in fetching data.')
        }
    };

    const handleCopy = (text: string) => navigator.clipboard.writeText(text);

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this URL?");
        if (confirmDelete) {
            try {
                await DeleteUrl(id);
                setUrlList(urlList.filter((url: { id: string }) => url.id !== id));
            }
            catch (error)
            {
                console.error('Error in deleting: ', error);
            }
        }
    };

    const onShortenClick = () => {
        fetchUrlList()
    }

    useEffect(() => {
        fetchUrlList();
    }, [])

    return (
        <>
            <ShortenerForm onShortenClick={onShortenClick} />

            {urlList.length > 0 && !error ? urlList.map((url: Url) => 
                <div key={url.id} className="flex flex-col items-center justify-between w-full space-x-4 p-6 bg-white rounded-lg md:flex-row">
                    <p className="font-bold text-center text-veryDarkViolet md:text-left">
                        {url.long_url}
                    </p>
                    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
                        <a
                            href={`${API_BASE_URL}/shorteners/${url.short_url}`}
                            className="font-bold text-cyan hover:text-blue-400 hover:underline" target="_blank"
                        >
                            {`${API_BASE_URL}/shorteners/${url.short_url}`}
                        </a>
                        <button
                            className="py-2 px-8 bg-blue-300 rounded-lg hover:opacity-70 focus:outline-none hover:cursor-copy"
                            onClick={() => handleCopy(`${API_BASE_URL}/shorteners/${url.short_url}`)}
                        >
                            Copy
                        </button>
                        <button
                            className="py-2 px-8 bg-red-400 rounded-lg hover:opacity-70 focus:outline-none hover:cursor-pointer"
                            onClick={() => handleDelete(url.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-2xl">There is no data</div>
            )}
        </>
    )
}