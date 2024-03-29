import { motion } from 'framer-motion'
import { HTMLProps, PropsWithChildren } from 'react'
import { FaSpinner } from 'react-icons/fa'

type Props = HTMLProps<HTMLButtonElement> & {
    loading?: boolean
    type?: "button" | "submit" | "reset"
}

const ActionButton = (props: PropsWithChildren<Props>) => {
  
    return (
        <>
            { !props.loading ?
                <motion.button 
                    className={`bg-primary text-white font-bold p-2 rounded ${props.className}`}
                    disabled={props.loading}
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    onClick={props.onClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                        <span>{props.children}</span>
                </motion.button>
                :
                <button 
                    disabled={props.loading} 
                    className={`bg-primary text-white font-bold p-2 rounded ${props.className}`}
                    type={props.type}
                    id={props.id}
                >
                    <FaSpinner className="animate-spin inline" />
                </button>
            }
        </>
    );
}

export default ActionButton;