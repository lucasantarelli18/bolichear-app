import * as React from "react";
import { Text, View, Button } from "react-native";
import { supabase } from "./supabase";
import "react-native-url-polyfill/auto";

export const getLocalesXUser = async (idDueno) => {
  let { data: Local, error } = await supabase
    .from('Local')
    .select(`
    *,
    Domicilio (
      *
    )
  `)
    .eq('idDueño', idDueno)
  return Local
}

export const getLocalidadesXProv = async (idProv) => {
  let { data: Localidad, error } = await supabase
    .from('Localidad')
    .select('*')
    .eq('idProvincia', idProv)
  return Localidad
}

export const getLocalidadXNombre = async (nombre) => {
  let { data: Localidad, error } = await supabase
    .from('Localidad')
    .select('*')
    .eq('nombre', nombre)
  return Localidad
}

//Get Filtrado
export const getLocalxDomicilio = async () => {
  const { data, error } = await supabase.from("Local").select(`
    *,
    Domicilio (
      *
    )
  `);
  return data;
};

export const getLocalxID = async (idLocal) => {
  const { data, error } = await supabase
    .from("Local")
    .select(
      `*, Domicilio (
      *
    )`
    )
    .eq("id", idLocal);

  return data;
};

export const getFotoxIdLocal = async (idLocal) => {
  const { data: Foto, error } = await supabase
    .from("Foto")
    .select("*")
    .eq("idLocal", idLocal);
  return Foto;
};

export const getEventosxIdLocal = async (idLocal) => {
  let { data: Evento, error } = await supabase.from("Evento").select("*").eq("idLocal", idLocal,);
  return Evento;
};

export const getPromosxIdLocal = async (idLocal) => {
  let { data: Promo, error } = await supabase.from("Promocion").select("*").eq("idLocal", idLocal,);
  return Promo;
};

export const getUltimoDomicilio = async () => {
  const { data, error, count } = await supabase.from('Domicilio')
    .select('id')
    .order('id', { ascending: false })
  return data
}


//Obtiene domicilio pasado como param
/*
export const getLocalxDomicilio = async () => {  
  let { data: Local, error } = await supabase
  .from('Local')
  .select('*, Domicilio!inner(*)')
  .eq('Domicilio.id', 'Local.idDomicilio')
  return Local
}

*/

export const getPromocionXLocal = async () => {

  const { data, error } = await supabase.from('Promocion').select(`
        *,
        Local (
          id, idDueño
        ),
        Foto(
          path, idPromocion
        )
      `)
  return data

}
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
  let { data: Provincia, error } = await supabase.from("Provincia").select("*");
  return Provincia;
};

export const getLocalidades = async () => {
  let { data: Localidad, error } = await supabase.from("Localidad").select("*");
  return Localidad;
};

export const getDomicilios = async () => {
  let { data: Domicilio, error } = await supabase.from("Domicilio").select("*");
  return Domicilio;
};

export const getPromociones = async () => {
  let { data: Promocion, error } = await supabase.from("Promocion").select("*");
  return Promocion;
};

export const getLocales = async () => {
  let { data: Local, error } = await supabase.from("Local").select("*");
  return Local;
};

export const getAsistencias = async () => {
  let { data: Asistencia, error } = await supabase
    .from("Asistencia")
    .select("*");
  return Asistencia;
};

export const getFotos = async () => {
  let { data: Foto, error } = await supabase.from("Foto").select("*");
  return Foto;
};

export const getEventos = async () => {
  let { data: Evento, error } = await supabase.from("Evento").select("*");
  return Evento;
};

export const getTipoEventos = async () => {
  let { data: TipoEvento, error } = await supabase
    .from("TipoEvento")
    .select("*");
  return TipoEvento;
};

export const getUsuarios = async () => {
  let { data: Usuario, error } = await supabase.from("Usuario").select("*");
  return Usuario;
};

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
    .from("Provincia")
    .insert([{ nombre: nombreProv }]);
};

export const insertLocalidad = async (nombreLoc, codPostal, idProv) => {
  const { data, error } = await supabase
    .from("Localidad")
    .insert([
      { nombre: nombreLoc, codigoPostal: codPostal, idProvincia: idProv },
    ]);
};

export const insertDomicilio = async (calle, num, piso, dpto, idLocalidad) => {
  const { data, error } = await supabase
    .from('Domicilio')
    .insert([
      {
        calle: calle,

        numero: num,
        piso: piso,
        dpto: dpto,
        idLocalidad: idLocalidad,
      },
    ]);
};

export const insertDomicilioSinPiso = async (calle, num, idLocalidad) => {
  const { data, error } = await supabase
    .from('Domicilio')
    .insert([
      {
        calle: calle,
        numero: num,
        idLocalidad: idLocalidad

      },
    ]);
};

/* export const insertPromocion = async (nombrePromo, descrip, fHInicio, fHFin, idLocal, idPromo) => {  
  const { data, error } = await supabase
  .from('Domicilio')
  .insert([
    { calle: calle,
      numero: num,
      idLocalidad: idLocalidad

    },
  ]);
}; */

export const insertPromocion = async (nombrePromo, descrip, fHInicio, fHFin, idLocal, idPromo) => {
  const { data, error } = await supabase.from("Promocion").insert([
    {
      nombre: nombrePromo,
      descripcion: descrip,
      fechaHoraInicio: fHInicio,
      fechaHoraFin: fHFin,
      idLocal: idLocal,
      idPromocion: idPromo
    },
  ]);
};

export const insertLocal = async (nombreLocal, lat, long, idDuen, idDomicili) => {
  console.log(nombreLocal, lat, long, idDuen, idDomicili);
  const { data, error } = await supabase
    .from('Local')
    .insert([
      {
        nombre: nombreLocal,
        latitud: lat,
        longitud: long,
        idDueño: parseInt(idDuen),
        idDomicilio: parseInt(idDomicili),
      },
    ])
  if (error) { console.log(error) }
}

export const insertAsistencia = async (fecha, idLocal, idUsuario) => {
  const { data, error } = await supabase
    .from("Asistencia")
    .insert([{ fecha: fecha, idLocal: idLocal, idUsuario: idUsuario }]);
};

export const insertFoto = async (path, idLocal, idEvento, idPromo) => {
  const { data, error } = await supabase.from("Foto").insert([
    {
      path: path,
      idLocal: idLocal,
      idEvento: idEvento,
      idPromocion: idPromo,
    },
  ]);
};

export const insertEvento = async (
  nombreEvento,
  descripcion,
  fHoraInicio,
  fHoraFin,
  idTipoEvento,
  idLocal
) => {
  const { data, error } = await supabase.from("Evento").insert([
    {
      nombre: nombreEvento,
      descripcion: descripcion,
      fechaHoraInicio: fHoraInicio,
      fechaHoraFin: fHoraFin,
      idTipoEvento: idTipoEvento,
      idLocal: idLocal,
    },
  ]);
};

export const insertTipoEvento = async (tipo) => {
  const { data, error } = await supabase
    .from("TipoEvento")
    .insert([{ tipo: tipo }]);
};

export const insertUsuario = async (nombreUsuario, contraseña) => {
  const { data, error } = await supabase
    .from('Usuario')
    .insert([
      {
        nombre: nombreUsuario,
        contraseña: contraseña
      },
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
    .from("Provincia")
    .update({ nombre: nombreProv })
    .eq("id", idProv);
};

export const updateLocalidad = async (idLoc, nombreLoc, codPostal) => {
  const { data, error } = await supabase
    .from('Localidad')
    .update({
      nombre: nombreLoc,
      codigoPostal: codPostal
    })
    .eq('id', idLoc)
}

export const updatePromocion = async (nombrePromo, descrip, fHInicio, fHFin, idLocal) => {
  const { data, error } = await supabase
    .from('Promocion')
    .update({
      nombre: nombrePromo,
      descripcion: descrip,
      fechaHoraInicio: fHInicio,
      fechaHoraFin: fHFin,
      idLocal: idLocal
    })
    .eq('id', idLoc)
}



//DELETES

export const deletePromocion = async (idPromo) => {
  const { data, error } = await supabase
    .from('Promocion')
    .delete()
    .match({ id: idPromo })
}

