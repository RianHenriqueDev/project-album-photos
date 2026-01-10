import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photo-navigator";
import ImagePreview from "../components/image-file-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhoto from "../contexts/photos/hooks/use-photo";
import React from "react";

export default function PagePhotoDetails() {
  const {id} = useParams();
      const {photo,nextPhotoId,previousPhotoId,isLoadingPhoto,deletePhoto} = usePhoto(id);
    const {albums,isLoadingAlbums} = useAlbums();
    const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition();


    function handleDeletePhoto() {
      setIsDeletingPhoto(async () => {
        await deletePhoto(photo!.id);
      })
    }

if (!isLoadingAlbums && !photo) {
  return <div>Foto não encontrada!</div>
} 

    return (
 <Container>
  {/* HEADER */}
  <header className="flex items-center justify-between mb-10">
    <Text as="h2" variant="heading-large">
      {photo?.title}
    </Text>

    <PhotosNavigator 
    previousPhotoId={previousPhotoId} 
    nextPhotoId={nextPhotoId} 
    loading={isLoadingPhoto} />
    
  </header>

  
  <div className="grid grid-cols-[21rem_1fr] gap-24">
    
    <div className="space-y-3">
        {!isLoadingPhoto ? (  <ImagePreview
        src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
        title={photo?.title}
        imageClassName="h-[21rem]"
      />) : (<Skeleton className="h-[21rem]"/>)}
    

      {!isLoadingPhoto ?
      <Button variant="destructive" onClick={handleDeletePhoto} disabled={isDeletingPhoto}> {isDeletingPhoto ? "Excluindo..." : "Excluir"}</Button> :
      <Skeleton className="h-10 w-20"/>}
    </div>

<div className="py-3">
  <Text as="h3" variant="heading-medium" className="mb-6">
        Álbuns
  </Text>

<AlbumsListSelectable albums={albums} photo={photo as Photo} loading={isLoadingAlbums}/>  

</div>
 
    <div />
  </div>
</Container>
    )
}