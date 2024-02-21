const path = require('path')
const fs = require('fs');
import('../types/Subject.js')
  .then(({ Subject, Lab, Visit }) => {
    function fillInfo(subjectTitle, subjectDir, countLab, countVisit) {
      const subject = new Subject();
      subject.Title = subjectTitle;
      for (let i = 1; i <= countLab; i++) {
        const lab = new Lab();
        lab.Title = "Lab_" + i;
        lab.FileName = "Lab_" + i;
        lab.Subject = subject.Title;
        lab.Path = `\\database\\${subjectDir}\\${subjectDir}_${lab.Title}.json`;
        lab.Number = i;
        subject.Labs.push(lab.Title);
        fs.writeFile('..' + lab.Path, JSON.stringify(lab), () => {
          const absolutePath = path.resolve('..' + lab.Path);
          console.log("Файл lab создан:", absolutePath);    });
      }
      for (let i = 1; i <= countVisit; i++) {
        const visit = new Visit();
        visit.Title = "Visit_" + i;
        visit.FileName = "Visit_" + i;
        visit.Subject = subject.Title;
        visit.Path = `\\database\\${subjectDir}\\${subjectDir}_${visit.Title}.json`;
        visit.Number = i;
        subject.Visits.push(visit.Title);
        let Type;
        fs.readFile('..' + visit.Path, 'utf-8',(err, data) => {
          const absolutePath = path.resolve('..' + visit.Path);
          // console.log(data);
            try {
              const obj = JSON.parse(data)
              // console.log(obj)
              Type = obj.Type;
              visit.Type = obj.Type;
              console.log("Файл прочитан:", absolutePath);
              fs.writeFile('..' + visit.Path, JSON.stringify(visit), () => {
                const absolutePath = path.resolve('..' + visit.Path);
                console.log("Файл visit создан:", absolutePath);
              });
            }
            catch (e) {
              fs.writeFile('..' + visit.Path, JSON.stringify(visit), () => {
                const absolutePath = path.resolve('..' + visit.Path);
                console.log("Файл visit создан:", absolutePath);
              });
            }
          
        });

      }
      // console.log(subject);
      fs.writeFile(`../database/${subjectDir}/subject.json`, JSON.stringify(subject), () => {
        console.log("file subject created")
      });
    }
    fillInfo("Большие данные", "bigdata", 10, 8)
    fillInfo("Компьютерная обработка изображений", "koi", 10, 17)
    fillInfo("Моделирование систем", "ms", 5,17)
    fillInfo("Методы и средства проектирования информационных систем и технологий", "mispisit", 8, 17)
    fillInfo("Нормативно-правовые основы профессиональной деятельности", "npopd", 4, 8)
    fillInfo("Основы военной подготовки", "ovp", 0, 17)
    fillInfo("Практикум дизайна", "pd", 10, 8)
    fillInfo("Прикладная физическая культура (элективный модуль)", "pvk", 0, 17)
    fillInfo("Web-технологии", "web", 10, 17)
/*    fs.readdir(`../database`, (err, files) => {
      // console.log(files)
      for (let dir of files) {
        // console.log(dir)
        fs.readdir(`../database/${dir}`, (err, files) => {
          fs.readFile(`../database/${dir}/${files[0]}`, (err, data) => {
            // console.log(JSON.parse(data).Title)
            fillInfo(JSON.parse(data).Title, dir, 15, 17)
          })
        })
      }
    })*/
})

