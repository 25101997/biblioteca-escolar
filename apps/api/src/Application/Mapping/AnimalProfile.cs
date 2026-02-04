using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mapping
{
    public class AnimalProfile : Profile
    {
        public AnimalProfile()
        {
            // Request → Entidad
            CreateMap<AnimalCreateDto, Animal>();
            
            CreateMap<AnimalUpdateDto, Animal>();

            // Entidad → Response
            CreateMap<Animal, AnimalReadDto>();

            CreateMap<AnimalOrigin, AnimalOriginReadDto>();
            CreateMap<AnimalStatus, AnimalStatusReadDto>();
            CreateMap<AnimalStage, AnimalStageReadDto>();

            //.ForMember(dest => dest.Origin, opt => opt.MapFrom(src => src.Origin!.Name))
            //.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status!.Name))
            //.ForMember(dest => dest.Stage, opt => opt.MapFrom(src => src.Stage!.Name))
        }
    }
}
