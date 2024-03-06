import React, { useEffect } from 'react'
import XMLParser from 'react-xml-parser';

function Api() {

    useEffect(() => {
        fetch("/author/list/18541?format=xml&key=TftQypHkudfH0VZcukEWtg")
            .then(res => res.text())
            .then(data => {
                var xml = new XMLParser().parseFromString(data); 
                console.log(xml)
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div></div>
    )
}

export default Api