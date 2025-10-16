'use client'

import { useEffect, useState } from "react"
import axios from "axios";
import { Story } from "./models/story";
import Link from "next/link";


export default function HackerNews() {

    const [stories, setStories] = useState<Story[]>([]);
    const [errors, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchTopStories = async () => {
            try {
                const { data: topIds } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
                const items10: number[] = topIds.slice(0, 10);
                const promises = items10.map((id: number) =>
                    axios.get<Story>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                        .then(res => res.data));

                const results: Story[] = await Promise.all(promises);
                setStories(results);
            } catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        }

        fetchTopStories();
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div> ):
                (<div className="p-5">
                    <ul>
                        {stories &&
                            stories.map((story: Story) =>
                                <li className="p-2" key={story.id}>
                                    <Link style={{ color: "blue", textDecoration: "underline" }} href={story.url}>{story.title}</Link>
                                    <p>{story.score} by {story.by}</p>
                                </li>)
                        }
                    </ul>
                    {errors && <p style={{ color: 'red' }}>{errors}</p>}
                </div>)
            }
        </>
    )
}