import React, { useContext, useState } from 'react'
import Ct from './Ct'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProdDetail = () => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    let [textcom, setTextcom] = useState("")
    let navigate = useNavigate()

    let obj = useContext(Ct)
    let item = obj.cont.item

    let addcom = () => {
        axios.put("http://localhost:5000/prod/prodcom", { "name": obj.cont.name, "comdet": textcom, "rate": value, "_id": item._id },{"headers":{"authorization":obj.cont.token}}).then((res) => {
            navigate("/")
        })
    }

    return (
        <div className='prodcon'>
            <div className='img'><img src={`http://localhost:5000/imgs/${item.pimg}`} /></div>
            <p>Name:{item.name}</p>
            <p>Desc:{item.desc}</p>
            <p>Cat:{item.cat}</p>
            <p>Price:<b>{item.price}</b></p>
            {
                item.com.map((cm) => {
                    return (<div><h3>{cm.name}</h3>
                    <Rating name="read-only" value={cm.rate} readOnly />
                    <div>{cm.comdet}</div>
                    </div>
                    )
                })
            }
            <button onClick={() => obj.cont.addtocart(item)}>Add Cart</button>
            <textarea onChange={(e) => setTextcom(e.target.value)}></textarea>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <button onClick={addcom}>Add comment</button>


        </div>
    )
}

export default ProdDetail