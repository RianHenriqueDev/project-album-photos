import type classNames from "classnames";
import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
    return (
        <Container>
            <AlbumsFilter albums={[{id: '321', title: "Album 1"},
                {id: '123', title: "Album 2"},
                {id: '456', title: "Album 3"}]} className="mb-9"/>
        <PhotosList photos={[
            {
            id: '123',
            title: "Olá Mundo!",
            imageId:"portrait-tower.png",
            albums: [
                {id: '321', title: "Album 1"},
                {id: '123', title: "Album 2"},
                {id: '456', title: "Album 3"}
            ]
            },
            {
            id: '321',
            title: "Olá Mundo 2!",
            imageId:"portrait-tower.png",
            albums: [
                {id: '456', title: "Album 1"},
                {id: '786', title: "Album 2"},
                {id: '101', title: "Album 3"}
            ]
            }
        ]}/>
        </Container>
    )
}