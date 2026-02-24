import { ArrowLeft, Check, Coins } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { useState } from 'react';

export const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect for trying out the NexSite and also create and deploy websites.",
    features: [
      "100 AI credits",
      "Basic website generation",
      "Community support",
      "Standard templates",
    ],
    popular: false,
    button: "Get Started",
  },

  {
    key: "pro",
    name: "Pro",
    price: "₹499",
    credits: 500,
    description: "Best for creators and developers building multiple sites.",
    features: [
      "1000 AI credits",
      "Faster generation",
      "Premium templates",
      "Priority support",
      "Deploy & share websites",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },

  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1499",
    credits: 1000,
    description: "For teams and businesses needing high-volume generation.",
    features: [
      "10,000 AI credits",
      "Unlimited projects",
      "Team collaboration",
      "Dedicated support",
      "Custom branding",
      "API access",
    ],
    popular: false,
    button: "Contact Sales",
  },
];

function Pricing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(null)
  const {userData}=useSelector(state=>state.user)

  const handleBuy = async (plankey)=> {
  if(!userData){
      navigate('/')
      return
    }
  if(plankey == "free"){
    navigate('/dashboard')
    return
  } 
  setLoading(plankey)
  try {
    const result = await axios.post(`${serverUrl}/api/billing`,{planType:plankey},{withCredentials:true})
    window.location.href = result.data.sessionUrl
  } catch (error) {
    console.log(error)
    setLoading(null)
  }

  }
  return (
    <div className='relative min-h-screen overflow-hidden 
    bg-[#050505] text-white px-6 pt-16 pb-24'>
       
  <div className='absolute inset-0 pointer-events-none'>
    <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20
    rounded-full blur-[120px]' />
    <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20
    rounded-full blur-[120px]'/>
  </div>
    
     <button
     onClick={()=>navigate("/")}
      className='relative z-10 mb-8 flex items-center gap-2 text-sm 
     text-zinc-400 hover:text-white transition'><ArrowLeft size={16}/> Back</button>
     
       <motion.div
       initial={{opacity:0,y:24}}
       animate={{opacity:1,y:0}}
       className='relative z-10 max-w-4xl mx-auto text-center mb-14'
       >
           <h1 className='text-4xl md:text-5xl font-bold mb-4'>Simple,Transparent,Pricing</h1>
           <p className='text-zinc-400 text-lg'>Buy Credits Once. Build Anytime</p>
       </motion.div>

       <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((p, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.12 }}
    whileHover={{ y: -14, scale: 1.03 }}
    className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all
      ${
        p.popular
          ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
          : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
      }`}
  >
    {p.popular && (
    <span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full 
    bg-indigo-500'>Most Popular</span> )}
    <h1 className='text-xl font-semibold mb-2'>{p.name}</h1>
    <p className='text-zinc-400 mb-6 text-sm '>{p.description}</p>

    <div className='flex items-end gap-1 mb-4'>
      <span className='text-4xl font-bold'>{p.price}</span>
      <span className='text-sm text-zinc-400 mb-1'>/one-time</span>
    </div>

    <div className='flex items-center gap-2 mb-8'>
      <Coins size={18} className='text-yellow-400' />
      <span className='font-sm'>{p.credits} Credits</span>
    </div>

    <ul className='space-y-3 mb-10'>
      {p.features.map((f)=>(
        <li
        className='flex items-center gap-2 text-sm text-zinc-300'
         key={f}>
          <Check size={16} color='green'/>
          {f}
        </li>
      ))}
    </ul>
   
    <motion.button
    disabled={loading}
    onClick={()=>handleBuy(p.key)}
    whileTap={{scale:0.96}} 
    className={`w-full py-3 rounded-xl font-semibold transition
      ${p.popular ? "bg-indigo-500 hover:bg-indigo-600":"bg-white/10 hover:bg-white/20"}
      disabled:opacity-60`}
    >
      {loading===p.key ? "Redirecting...":p.button}
   
    </motion.button>



  </motion.div>
))}
       </div>

    </div>
  )
}

export default Pricing