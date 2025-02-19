import { useState } from "react";
import { GenerateUrl } from "../../network/api";

export default function ShortenerForm()
{
    const [error, setError] = useState<string | null>();
    const [url, setUrl] = useState({
        long_url: ''
    });

    const handleChange = (event: {target: {name: string, value: string}}) => {
        setUrl({...url, [event.target.name]: event.target.value});
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await GenerateUrl(url);
            setUrl({long_url: ''});
        }
        catch (error)
        {
            setError('Something went wrong in fetching data.')
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                id="link-form" className="relative flex flex-col w-full p-10 space-y-4 bg-neutral-200 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
            >
                <input
                    type="text"
                    name="long_url"
                    className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus-outline-none"
                    placeholder="Shorten a link here."
                    value={url.long_url}
                    onChange={handleChange}
                />
                <button className="px-10 py-3 bg-blue-300 rounded-lg hover:bg-cyanLight focus:outline-none md:py-2">
                    Shorten It!
                </button>
            </form>
        </>
    );
}