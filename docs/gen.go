package main

import (
	"fmt"
	"os"
	"path/filepath"
	"text/template"
)

func main() {
	// main template
	mainTemplate, err := template.ParseFiles("main.md")
	ce(err, "parse main template")

	// sub templates
	dir, err := os.Open(".")
	ce(err, "open dir")
	infos, err := dir.Readdir(-1)
	ce(err, "read dir")
	for _, info := range infos {
		if info.Name() == "main.md" {
			continue
		}
		ext := filepath.Ext(info.Name())
		if ext != ".md" && ext != ".js" {
			continue
		}
		name := filepath.Base(info.Name())
		subTemplate := mainTemplate.New(name)
		_, err = subTemplate.ParseFiles(info.Name())
		ce(err, "parse sub template")
	}

	// execute
	err = mainTemplate.Execute(os.Stdout, nil)
	ce(err, "output")
}

func ce(err error, args ...interface{}) {
	if err != nil {
		panic(fmt.Errorf("%v %v", err, args))
	}
}
