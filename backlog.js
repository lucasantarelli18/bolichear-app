import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { supabase } from './supabase';

//Gets all

/*
EJEMPLO PARA OBTENER TODOS LOS CAMPOS DE PROVINCIAS

React.useEffect(() => {
  Backend.getProvincias()
  .then((items) => {
    console.log(items)
  })
}, [])

*/

export const getProvincias = async () => {  
  let { data: Provincia, error } = await supabase
  .from('Provincia')
  .select('*')
  return Provincia
}

export const getLocalidades = async () => {  
  let { data: Localidad, error } = await supabase
  .from('Localidad')
  .select('*')
  return Localidad
}

export const getDomicilios = async () => {  
  let { data: Domicilio, error } = await supabase
  .from('Domicilio')
  .select('*')
  return Domicilio
}

export const getPromociones = async () => {  
  let { data: Promocion, error } = await supabase
  .from('Promocion')
  .select('*')
  return Promocion
}

export const getLocales = async () => {  
  let { data: Local, error } = await supabase
  .from('Local')
  .select('*')
  return Local
}

export const getAsistencias = async () => {  
  let { data: Asistencia, error } = await supabase
  .from('Asistencia')
  .select('*')
  return Asistencia
}

export const getFotos = async () => {  
  let { data: Foto, error } = await supabase
  .from('Foto')
  .select('*')
  return Foto
}

export const getEventos = async () => {  
  let { data: Evento, error } = await supabase
  .from('Evento')
  .select('*')
  return Evento
}

export const getTipoEventos = async () => {  
  let { data: TipoEvento, error } = await supabase
  .from('TipoEvento')
  .select('*')
  return TipoEvento
}

export const getUsuarios = async () => {  
  let { data: Usuario, error } = await supabase
  .from('Usuario')
  .select('*')
  return Usuario
}


//Inserts

/*
EJEMPLO PARA INSERTAR NUEVA PROVINCIA CON NOMBRE parametro

React.useEffect(() => {
  Backend.insertProvincia(parametro)
  .then((items) => {})
}, [])

*/

export const insertProvincia = async (nombreProv) => {  
  const { data, error } = await supabase
  .from('Provincia')
  .insert([
    { nombre: nombreProv},
  ])
}


//Updates

/*
EJEMPLO PARA MODIFICAR UNA PROVINCIA DE ID parametro POR NOMBRE nombre

React.useEffect(() => {
  Backend.updateProvincia(parametro, nombre)
  .then((items) => {})
}, [])

*/

export const updateProvincia = async (idProv, nombreProv) => {  
  const { data, error } = await supabase
  .from('Provincia')
  .update({ nombre: nombreProv })
  .eq('id', idProv)
}




