import './Alert.css';
import { useEffect } from 'react'
import {AiFillExclamationCircle, AiOutlineCloseCircle} from 'react-icons/ai'

const Alert=({alertContent, alertClass, onCloseAlert})=>{

    useEffect(()=>{

        const int = setTimeout(()=>{
            onCloseAlert()
        },3000)

        return ()=>{
            clearTimeout(int)
        }
    })
    return(<div className={`alert ${alertClass}`}>
        <AiFillExclamationCircle className='icon-x'/>
        <span className='msg'>{alertContent}</span>
        <div className='close-btn' onClick={ onCloseAlert }>
            <AiOutlineCloseCircle size={19} className='icon-x'/>
        </div>
    </div>)
}
export default Alert;