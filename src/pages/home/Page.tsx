import ShortenerList from "../../components/List/ShortenerList";

export default function Page()
{
    return (
        <>
            <div className='bg-gray-100 h-screen'>
                <section id="shorten">
                <div className="max-w-6xl mx-auto p-6 space-y-6">
                    <h1 className='text-3xl text-center font-bold'>A shortener for your too long url links.</h1>
                    <ShortenerList/>
                </div>
                </section>
            </div>  
        </>
    );
}