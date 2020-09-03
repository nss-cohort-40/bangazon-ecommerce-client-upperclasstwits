import React, { useEffect, useState, useRef } from "react"

const UserProducts = props => {
    const [userProductsList, setUserProductsList] = useState([])

    const getUserProducts = () => {

        fetch("http://localhost:8000/products?customer_id=customer")
    }
}