using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mapping
{
    public class AnimalReproductiveRecordProfile : Profile
    {
        public AnimalReproductiveRecordProfile()
        {
            CreateMap<AnimalReproductiveRecordCreateDto, AnimalReproductiveRecord>();

            CreateMap<AnimalReproductiveRecordUpdateDto, AnimalReproductiveRecord>();
            
            CreateMap<AnimalReproductiveRecord, AnimalReproductiveRecordReadDto>();
        }
    }
}
