interface subItemsInfoType {
    href: string,
    label: string,
    date: string,
}

interface itemsInfoType {
    href: string,
    label: string,
    date: string,
    submenu: subItemsInfoType[]
}

export const modedev = true

export const infoCourse = {
    title: "Sistemas Embebidos",
    description: "Los sistemas embebidos son sistemas informáticos diseñados para realizar tareas específicas. A diferencia de las computadoras de propósito general, los sistemas embebidos están diseñados para cumplir una función particular y forman parte integral de los dispositivos en los que se integran.",
    image: "https://www.parasoft.com/wp-content/uploads/2023/10/blog-feature-What-Are-Embedded-Systems.jpg"
}

export const itemsInfo: itemsInfoType[] = [
    {
        href: "/course",
        label: "Introducción",
        date: '2024-4-17',
        submenu: []
    },
    {
        href: "/course/contents/semana1",
        label: "Semana 1",
        date: '2024-4-17',
        submenu: [
            {
                href: "/course/contents/semana1",
                label: "Contenido",
                date: '2024-4-17',
            },
            {
                href: "/course/activities/actividad1",
                label: "Actividad 1",
                date: '2024-4-17',
            },           
        ]
    },     
]
