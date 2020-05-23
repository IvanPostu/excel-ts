import {z} from '@/components/q'
import './index.scss'

async function tick(){
  const qq = await Promise.resolve(11)
  z('Friend ')
  console.log(qq);

}

tick()
console.log('hi111')