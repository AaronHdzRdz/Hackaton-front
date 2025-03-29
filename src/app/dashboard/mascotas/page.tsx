import FichaMascota from './../../../components/mascotas/FichaMascota';

export const mascotas: Mascota[] = [
    {
      id: "001",
      nombre: "Luna",
      especie: "Perro",
      raza: "Labrador Retriever",
      tamaño: "Grande",
      edad: 4,
      peso: 28,
      foto: "https://images.dog.ceo/breeds/labrador/n02099712_3847.jpg"
    },
    {
      id: "002",
      nombre: "Milo",
      especie: "Gato",
      raza: "Maine Coon",
      tamaño: "Mediano",
      edad: 2,
      peso: 6,
      foto: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg"
    },
    {
      id: "003",
      nombre: "Rocky",
      especie: "Perro",
      raza: "Chihuahua",
      tamaño: "Pequeño",
      edad: 6,
      peso: 3,
      foto: "https://images.dog.ceo/breeds/chihuahua/n02085620_3060.jpg"
    }
  ];
  

  export default function DefaultMascotasView() {
    return (
      <div className="flex flex-col gap-6">
        {mascotas.map(mascota => (
          <FichaMascota key={mascota.id} mascota={mascota} />
        ))}
      </div>
    );
  }
  