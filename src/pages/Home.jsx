import React from 'react'
import { useEffect , useState } from 'react'
import service from '../appwrite/appwrite_config'
import { Container , PostCard } from '../components'

const Home = () => {
    const [post , setPosts] = useState([])

    useEffect(()=>{
        service.getAllPost()
    .then((post)=>{
        if (post) {
            setPosts(post.documents)
        }
    })
    })
    
    if (post.length === 0) {
        if (posts.length === 0) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to read posts
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }
    return (
        <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {post.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                         </div>
                ))}
            </div>
        </div>
     )
}
}
export default Home