import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photo-navigator";
import ImagePreview from "../components/image-file-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";

export default function PagePhotoDetails() {
    const {id} = useParams();
    const isLoadingPhoto = false; //Apenas para testar o Mock
    const photo = {
        id: '123',
        title: "Olá Mundo!",
        imageId: "portrait-tower.png",
        albums: [
            {id: "123",title: "Albums 1"},
            {id: "456",title: "Albums 2"},
            {id: "789",title: "Albums 3"}
        ]
    } as Photo;
    return (
 <Container>
  {/* HEADER */}
  <header className="flex items-center justify-between mb-10">
    <Text as="h2" variant="heading-large">
      {photo.title}
    </Text>

    <PhotosNavigator loading={isLoadingPhoto} />
  </header>

  
  <div className="grid grid-cols-[21rem_1fr] gap-24">
    
    <div className="space-y-3">
        {!isLoadingPhoto ? (  <ImagePreview
        src={`/images/${photo.imageId}`}
        title={photo.title}
        imageClassName="h-[21rem]"
      />) : (<Skeleton className="h-[21rem]"/>)}
    

      {!isLoadingPhoto ?
      <Button variant="destructive"> Excluir</Button> :
      <Skeleton className="h-10 w-20"/>}
    </div>

<div className="py-3">
  <Text as="h3" variant="heading-medium" className="mb-6">
        Álbuns
  </Text>

<AlbumsListSelectable albums={[ {id: "123",title: "Albums 1"},
            {id: "456",title: "Albums 2"},
            {id: "789",title: "Albums 3"}]} photo={photo} loading={isLoadingPhoto}/>  

</div>
 
    <div />
  </div>
</Container>
    )
}