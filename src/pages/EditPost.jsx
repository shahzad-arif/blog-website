import React, { useEffect  , useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { Container , Postform  } from '../components'
import service from '../appwrite/appwrite_config'

const EditPost = () => {
    const [post , setPosts] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        if (slug) {
            service.getSinglePost(slug)
            .then((post)=>setPosts(post))
        }
        else{
            navigate('/')
        }
    } , [navigate , slug])

  return post ? (<div className='py-8'>

    <Container>

        <Postform post={post}/>
    </Container>
  </div>) : null;
}

export default EditPost