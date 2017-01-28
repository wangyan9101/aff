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

type Err struct {
	Pkg  string
	Info string
	Prev error
}

func (e *Err) Error() string {
	if e.Prev == nil {
		return fmt.Sprintf("%s: %s", e.Pkg, e.Info)
	}
	return fmt.Sprintf("%s: %s\n%v", e.Pkg, e.Info, e.Prev)
}

func me(err error, format string, args ...interface{}) *Err {
	if len(args) > 0 {
		return &Err{
			Pkg:  `affdocs`,
			Info: fmt.Sprintf(format, args...),
			Prev: err,
		}
	}
	return &Err{
		Pkg:  `affdocs`,
		Info: format,
		Prev: err,
	}
}

func ce(err error, format string, args ...interface{}) {
	if err != nil {
		panic(me(err, format, args...))
	}
}

func ct(err *error) {
	if p := recover(); p != nil {
		if e, ok := p.(error); ok {
			*err = e
		} else {
			panic(p)
		}
	}
}

func oe(e error) error {
	var ret error = e
	for err, ok := ret.(*Err); ok && err.Prev != nil; err, ok = ret.(*Err) {
		ret = err.Prev
	}
	return ret
}
