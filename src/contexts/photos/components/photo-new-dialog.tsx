import React from "react";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-file";
import ImagePreview from "../../../components/image-file-preview";
import Text from "../../../components/text";
import type { Album } from "../../albums/models/album";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schema";
import {zodResolver} from '@hookform/resolvers/zod'
import type { error } from "console";
import usePhoto from "../hooks/use-photo";

interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({trigger}: PhotoNewDialogProps) {

    const [modalOpen,setModalOpen] = React.useState(false);
    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema)
    });


    const {albums,isLoadingAlbums} = useAlbums();
    const {createPhoto} = usePhoto();
    const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition();





    const file = form.watch("file")
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    const albumsIds = form.watch("albumsId");

    React.useEffect(()=> {
        if(!modalOpen) {
            form.reset()
        }
    },[modalOpen,form]);

    function handleToggleAlbum(albumId:string) {
        const albumsIds = form.getValues("albumsId");
        const albumsSet = new Set(albumsIds);

        if(albumsSet.has(albumId)) {
            albumsSet.delete(albumId)
        }else {
            albumsSet.add(albumId)
        }

        form.setValue("albumsId",Array.from(albumsSet))
    }

    function handleSubmit(payload: PhotoNewFormSchema) {
       setIsCreatingPhoto(async () => {
            await createPhoto(payload);
            setModalOpen(false);
       })
    }

    return (<Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent >
            <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>Adicionar foto</DialogHeader>
            <DialogBody className="flex flex-col gap-5">
                <InputText placeholder="Adicione um título" maxLength={255} error={form.formState.errors.title?.message} {...form.register("title")}/>

                <Alert>Tamanho máximo: 50MB <br /> Você pode selecionar arquivo em PNG, JPG ou JPEG</Alert>

                <InputSingleFile 
                form={form} 
                allowedExtensions={['png','jpg','jpeg']} 
                maxFileSizeInMB={50} 
                replaceBy={<ImagePreview src={fileSource} className="w-full h-56"/>}
                error={form.formState.errors.file?.message} {...form.register("file")}
                />

                <div className="space-y-3">
                    <Text variant="label-small">Selecionar álbuns</Text>


                    <div className="flex flex-wrap gap-3 ">

                    {!isLoadingAlbums && albums.length > 0 && albums.map((album)=> 
                    
                    <Button key={album.id} variant={albumsIds?.includes(album.id) ? "primary" : "ghost"} size="sm" className="truncate" onClick={()=> handleToggleAlbum(album.id)}>{album.title}</Button>
                    
                    )}

{isLoadingAlbums && Array.from({length: 5}).map((_,index) => <Skeleton className="w-20 h-7" key={`album-loading-${index}`}/>)}

</div>

                </div>
            </DialogBody>

            <DialogFooter>
                <DialogClose>
                    <Button variant="secondary" disabled={isCreatingPhoto}>Cancelar</Button>
                </DialogClose>
                <Button disabled={isCreatingPhoto} handling={isCreatingPhoto} type="submit">{isCreatingPhoto ? "Adicionando..." : "Adicionar"}</Button>
            </DialogFooter>
</form>
        </DialogContent>
    </Dialog>)
}