import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from "../state";
import { motion } from 'framer-motion';

const Home = () => {
    const [mainPosts, setMainPosts] = useState(null)
    const [loading, setLoading] = useState(null)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch('http://localhost:8080/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                if(response.ok) {
                    const result = await response.json();
                    setMainPosts(result.data)
                    dispatch(setPosts({ posts: result.data.reverse() }));
                }
            } catch(e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const postsArr = function() {
        if (posts !== undefined) {
            return [...posts.slice(0, 9)] 
        } else if (mainPosts !== null) {
            return [...mainPosts.slice(0, 9)];
        }
        return [
            {photo: 'https://mspoweruser.com/wp-content/uploads/2023/06/Floating-island-Fantasy-Space.jpg'},
            {photo: 'https://beebom.com/wp-content/uploads/2023/05/Crowed-.jpg?quality=75&strip=all'},
            {photo: 'https://beebom.com/wp-content/uploads/2023/05/Game-.jpg?quality=75&strip=all '},
            {photo: 'https://images.ctfassets.net/3mnbejz4r6xh/2thtvAkPCBMk1DdiHjNQr/545f9dffd69a0b1f2e7021494d9eda39/Midjourney_AI_Generated_Art.png?w=1024&h=1024&q=50&fm=png'},
            {photo: 'https://beebom.com/wp-content/uploads/2023/05/Conquering-the-o.jpg?quality=75&strip=all'},
            {photo: 'https://beebom.com/wp-content/uploads/2023/05/Tribeswoman.jpg?quality=75&strip=all'},
            {photo: 'https://beebom.com/wp-content/uploads/2023/05/Ocean-.jpg?quality=75&strip=all'},
            {photo: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf508d9c-c6ce-47d1-80c0-0566e468538e_1024x1024.png'},
            {photo: 'https://beebom.com/wp-content/uploads/2023/05/Chameleon-1.jpg?quality=75&strip=all'}
        ]
    } 

  return (
    <motion.div initial={{opacity:0,display: 'none'}} animate={{opacity:1,display: 'flex'}} exit={{opacity: 0, transition: {duration:1},display: 'none'}} className='h-[100vh] w-full relative flex flex-col'>
        <div className='w-full h-[35vh] lg:h-[55vh] flex items-center justify-center flex-col relative z-[2] top-20 md:top-7'>
            <h2 className='text-white text-center font-bold text-4xl sm:text-7xl'>Turn your<br /> minds int
                <span className='inline-flex w-max relative left-[2px] pointer-events-none select-none'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/c/c0/Dog_Paw_Print.png' alt='' className='w-11 h-11 invert pointer-events-none' />
                </span> art</h2>
            <div className='flex flex-row h-max w-max gap-4 mt-7'>
                <Link to='/posts'>
                    <button className='bg-200% bg-left bg-gradient-to-r from-[#53a717] to-[#88945f] text-white px-8 py-2.5 rounded-xl font-semibold text-lg shadow-xl transition-all hover:bg-right'>Explore</button>
                </Link>
                <button className='bg-200% bg-left bg-gradient-to-r from-[#ffffff75] to-[#bebebe1c] border border-[#ffffff48]  text-white px-8 py-2.5 rounded-xl text-lg transition-all hover:bg-right'>About Us</button>
            </div>
        </div>
            <div className="w-full grow-3 relative flex gap-4 pb-5 overflow-hidden justify-center items-center z-[2]">
            <div className="w-[35%] hidden h-full flex-col gap-4 lg:flex pb-5">
                <div className="w-full h-[50%] flex items-strech gap-4">
                <img
                    src={postsArr()[1].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                <img
                    src={postsArr()[2].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                </div>
                <div className="w-full h-[50%] flex items-strech gap-4">
                <img
                    src={postsArr()[3].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                <img
                    src={postsArr()[4].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                </div>
            </div>

            <div className="w-full h-full lg:w-[35%] mt-7 p-14 md:w-[50%] lg:p-0 md:p-0 md:mt-0 lg:mt-0">
                <img
                src={postsArr()[0].photo}
                alt=""
                className="w-full object-cover h-full rounded-xl"
                />
            </div>

            <div className="w-[50%] h-full flex-col gap-4 lg:w-[35%] md:flex hidden pb-5">
                <div className="w-full h-[50%] flex items-strech gap-4">
                <img
                    src={postsArr()[5].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                <img
                    src={postsArr()[6].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                </div>
                <div className="w-full h-[50%] flex items-strech gap-4">
                <img
                    src={postsArr()[7].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                <img
                    src={postsArr()[8].photo}
                    alt=""
                    className="w-[48.7%] object-cover h-auto rounded-xl"
                />
                </div>
            </div>
            </div>
        

        <div className='vignette'></div>
        <div className='circle'></div>

        <div className='w-full h-max py-6 hidden items-center justify-center gap-7 z-[2] opacity-80 cursor-default lg:gap-[120px] md:gap-14 sm:flex'>
            <p className='text-white'>Disney 3d</p>
            <p className='text-white'>Masterpiece</p>
            <p className='text-white'>Jackson Pollock</p>
            <p className='text-white'>Pop Art</p>
            <p className='text-white'>Flat Illusion</p>
        </div>
    </motion.div>
  )
}

export default Home