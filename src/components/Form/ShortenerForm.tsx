import { useState } from "react";
import { GenerateUrl } from "../../network/api";

interface onShortenClickProps {
    onShortenClick: () => void
}

export default function ShortenerForm({onShortenClick}: onShortenClickProps)
{
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError]                   = useState<string | null>(null);
    const [url, setUrl]                       = useState({
        long_url: ''
    });

    const handleChange = (event: {target: {name: string, value: string}}) => {
        setUrl({ ...url, [event.target.name]: event.target.value });
        setSuccessMessage(null);
        setError(null);
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await GenerateUrl(url);
            setSuccessMessage('Url generated successfully.');
            setUrl({ long_url: '' });
            onShortenClick();
        }
        catch (error)
        {
            setError('Please enter a valid url link.')
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                id="link-form" className="relative w-full p-10 space-y-4 bg-neutral-200 rounded-lg"
            >
                <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-3">
                    <input
                        type="text"
                        name="long_url"
                        className="flex-1 p-3 border-2 rounded-lg placeholder-gray-400 focus-outline-none"
                        placeholder="Shorten a link here."
                        value={url.long_url}
                        onChange={handleChange}
                    />
                    <button type="submit" className="px-10 py-3 bg-blue-300 rounded-lg hover:bg-cyanLight focus:outline-none md:py-2">
                        Shorten It!
                    </button>
                </div>
                {successMessage && (
                    <div className="text-green-400 text-md">{successMessage}</div>
                )}
                {error && (
                    <div className="text-red-400 text-md">{error}</div>
                )}
            </form>
        </>
    );
}