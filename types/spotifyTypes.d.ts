declare namespace SpotifyTypes {
    type Track = {
        playing?: boolean
        progress?: number
        duration?: number
        imageUrl?: string
        title?: string
        artist?: string
    }
}

export = SpotifyTypes
