cmake_minimum_required(VERSION 3.1)
project(Invaders)

set(CMAKE_CXX_STANDARD 17)

add_subdirectory("spdlog")
find_library(spdlog REQUIRED)

# the directory where sfml is located
set(SFML_DIR "/usr/local/lib/cmake/SFML")
find_package(SFML 2.5 COMPONENTS graphics window audio REQUIRED)

include_directories("include/")
file(GLOB SOURCES "src/*.cpp")
add_executable(invaders src/main.cpp)

target_link_libraries(invaders spdlog sfml-system sfml-window sfml-graphics)

file(COPY assets DESTINATION simple_invaders/)