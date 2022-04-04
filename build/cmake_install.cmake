# Install script for directory: /home/faranaiki/Sources/olive-divergence

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "0")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/usr/bin/objdump")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/bin/olive-editor" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/bin/olive-editor")
    file(RPATH_CHECK
         FILE "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/bin/olive-editor"
         RPATH "")
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/bin" TYPE EXECUTABLE FILES "/home/faranaiki/Sources/olive-divergence/build/olive-editor")
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/bin/olive-editor" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/bin/olive-editor")
    if(CMAKE_INSTALL_DO_STRIP)
      execute_process(COMMAND "/usr/bin/strip" "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/bin/olive-editor")
    endif()
  endif()
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/olive-editor/effects" TYPE FILE FILES
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/boxblur.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/boxblur.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/bulge.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/bulge.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/chromakey.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/chromakey.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/chromaticaberration.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/chromaticaberration.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/colorcorrection.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/colorcorrection.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/colorsel.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/colorsel.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/common.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/common.vert"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/crop.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/crop.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/crossstitch.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/crossstitch.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/directionalblur.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/directionalblur.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/dropshadow.xml.disabled"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/emboss.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/emboss.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/findedges.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/findedges.xml.disabled"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/fisheye.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/fisheye.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/flip.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/flip.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/gaussianblur.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/gaussianblur.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/huesatbri.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/huesatbri.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/invert.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/invert.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/lumakey.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/lumakey.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/noise.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/noise.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/pixelate.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/pixelate.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/posterize.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/posterize.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/radialblur.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/radialblur.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/ripple.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/ripple.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/sphere.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/sphere.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/swirl.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/swirl.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/tile.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/tile.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/toonify.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/toonify.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/vignette.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/vignette.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/volumetriclight.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/volumetriclight.xml"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/wave.frag"
    "/home/faranaiki/Sources/olive-divergence/effects/shaders/Default/wave.xml"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/applications" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/org.olivevideoeditor.Olive.desktop")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/metainfo" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/org.olivevideoeditor.Olive.appdata.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/mime/packages" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/org.olivevideoeditor.Olive.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/16x16/apps" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/16x16/org.olivevideoeditor.Olive.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/32x32/apps" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/32x32/org.olivevideoeditor.Olive.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/48x48/apps" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/48x48/org.olivevideoeditor.Olive.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/64x64/apps" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/64x64/org.olivevideoeditor.Olive.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/128x128/apps" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/128x128/org.olivevideoeditor.Olive.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/256x256/apps" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/256x256/org.olivevideoeditor.Olive.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/512x512/apps" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/512x512/org.olivevideoeditor.Olive.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/16x16/mimetypes" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/16x16/application-vnd.olive-project.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/32x32/mimetypes" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/32x32/application-vnd.olive-project.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/48x48/mimetypes" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/48x48/application-vnd.olive-project.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/64x64/mimetypes" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/64x64/application-vnd.olive-project.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/128x128/mimetypes" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/128x128/application-vnd.olive-project.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/256x256/mimetypes" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/256x256/application-vnd.olive-project.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/512x512/mimetypes" TYPE FILE FILES "/home/faranaiki/Sources/olive-divergence/packaging/linux/icons/512x512/application-vnd.olive-project.png")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/olive-editor/ts" TYPE FILE FILES
    "/home/faranaiki/Sources/olive-divergence/build/olive_ar.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_bs.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_cs.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_de.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_es.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_fr.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_it.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_ru.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_sr.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_id.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_tr.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_pt-BR.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_uk.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_zh-CN.qm"
    "/home/faranaiki/Sources/olive-divergence/build/olive_zh-TW.qm"
    )
endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "/home/faranaiki/Sources/olive-divergence/build/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
