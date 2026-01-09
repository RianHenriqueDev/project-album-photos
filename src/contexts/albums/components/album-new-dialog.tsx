import type React from "react";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import type { Photo } from "../../photos/models/photo";
import SelectCheckboxIllustration from '../../../assets/images/select-checkbox.svg?react'
import Skeleton from "../../../components/skeleton";
import ImagePreview from "../../../components/image-file-preview";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}
export default function AlbumNewDialog({trigger} : AlbumNewDialogProps) {
    const isLoadingPhotos = false;
    const photos: Photo[] = [{
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
            }];



            function handleTogglePhoto(selected:boolean, photoId:string) {
                    console.log(selected, "Id photo: ",photoId)
            }



    return (<Dialog>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent>
            <DialogHeader>Criar álbum</DialogHeader>
            <DialogBody>
                <InputText placeholder="Adicione um título"/>
                
                <div className="space-y-3">
                    <Text variant="label-small" className="mb-3" as="div">Fotos cadastradas</Text>

                    {!isLoadingPhotos && photos.length > 0 &&
                    <div className="flex flex-wrap gap-2">

{photos.map(photo => <PhotoImageSelectable  onSelectImage={(selected)=> handleTogglePhoto(selected,photo.id)} key={photo.id} src={`/images/${photo.imageId}`} title={photo.title} imageClassName="h-20 w-20"/>)}


                    </div>
                    }

                {isLoadingPhotos && (<div className="flex flex-wrap gap-2"> 
                    { 
                        Array.from({length: 4}).map((_,index) => 
                        <Skeleton key={`photo-loading-${index}`} className="w-20 h-20 rounded-lg"/>)}
                        </div>)}

                {!isLoadingPhotos && photos.length === 0 && 
                <div className="w-full flex flex-col justify-center items-center gap-3">

                    <SelectCheckboxIllustration/>
                    <Text variant="paragraph-medium" className="text-center">Nenhuma foto disponível para seleção</Text>
                </div>
                }

                </div>
            </DialogBody>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary">Cancelar</Button>
                </DialogClose>
                <Button>Criar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>)
}