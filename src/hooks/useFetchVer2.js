import React, { useEffect, useState } from 'react';

export const useFetchVer2 = () => {

//método get
 const getData = async(url) =>{
    const request = await fetch(url, {
        method: "get",
        headers: new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin' : '*'
        }),
        body: JSON.stringify( data )
    });
    if (!request.ok)
        return {
            error: true,
            message : "Ocurrio un error"
        }
    else
        return {
            error : false,
            message: "Respuesta exitosa",
            data: await request.json(),
        }
 }

 //método post
 const setData = async(url, data) => {
    const request = await fetch(url, {
        method: "post",
        headers: new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin' : '*'
        }),
        body: JSON.stringify( data )
    });
    if (!request.ok)
        return {
            error: true,
            message : "Ocurrio un error"
        }
    else
        return {
            error : false,
            message: "Respuesta exitosa",
            data: await request.json(),
        }
 }

 //metodo put
 const updateData = async(url, data) => {
    const request = await fetch(url, {
        method: "update",
        headers: new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin' : '*'
        }),
        body: JSON.stringify( data )
    });
    if (!request.ok)
        return {
            error: true,
            message : "Ocurrio un error"
        }
    else
        return {
            error : false,
            message: "Respuesta exitosa",
            data: await request.json(),
        }
 }

 //metodo delete
 const deleteData = async(url) => {
    const request = await fetch(url, {
        method: "delete",
        headers: new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin' : '*'
        }),
        body: JSON.stringify( data )
    });
    if (!request.ok)
        return {
            error: true,
            message : "Ocurrio un error"
        }
    else
        return {
            error : false,
            message: "Respuesta exitosa",
            data: await request.json(),
        }
 }

 return{
    getData,
    setData,
    updateData,
    deleteData,
 }
}

