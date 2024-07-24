import React from 'react'
import { useEffect , useState } from 'react'
import service from '../appwrite/appwrite_config'
import { Container , PostCard } from '../components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state)=>state.auth.status)
    useEffect(() => {
        if (authStatus) {
            service.getAllPost().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
        else{
            setPosts([])
        }
      
    }, [authStatus])

    if (posts.length === 0 && !authStatus ) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500 text-black    ">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
}

export default Home