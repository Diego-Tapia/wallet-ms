import { Module } from '@nestjs/common';
import { AxiosProvider } from './axios/axios.provider';

@Module({
    providers: [
        AxiosProvider
    ],
    exports: [
        AxiosProvider
    ]
})

export class LibrarieModule {}