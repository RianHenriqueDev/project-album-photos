import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { fetcher } from "../../../helpers/api";
import {useQueryState, createSerializer, parseAsString} from 'nuqs'

// envia o albumId através de queryParams convertendo para String com o nuqs

const toSearchParams = createSerializer({
    albumId: parseAsString,
    q: parseAsString
})

export default function usePhotos() {

    const [albumId, setAlbumId] = useQueryState("albumId");
    const [q, setQ] = useQueryState("q");

    const {data, isLoading} = useQuery<Photo[]>({
        queryKey: ["photos",albumId,q],
        queryFn: ()=> fetcher(`/photos${toSearchParams({albumId,q})}`)
    })

    return {
        photos: data || [],
        isLoadingPhoto: isLoading,
        filters: {
            albumId,
            setAlbumId,
            q,
            setQ
        }
    }
}