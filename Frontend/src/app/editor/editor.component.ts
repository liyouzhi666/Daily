import { Component, AfterViewInit } from '@angular/core';
import {beforeUrl, pageAnimation,} from "../common/public-data";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  animations: [
    pageAnimation
  ]
})
export class EditorComponent implements AfterViewInit {

    editorOptions = {theme: 'vs-dark', language: 'python'};
    code: string= `
    #!/usr/bin/env python
    #encoding=utf-8
    import requests
    from bs4 import BeautifulSoup
    import MySQLdb
    import base64
    import warnings
    import sys
    
    reload(sys)
    sys.setdefaultencoding("utf-8")
    warnings.filterwarnings('ignore', category=MySQLdb.Warning)
    if __name__ == "__main__":
        db = MySQLdb.connect("localhost","root","pana","daily_db",charset='utf8' )
        # 使用cursor()方法获取操作游标
        cursor = db.cursor()
    
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
        re_obj = requests.get("https://github.com/kujian/frontendDaily")
        bs_obj = BeautifulSoup(re_obj.text.encode("utf8"), "html.parser")
    
        title = bs_obj.find("div",{"id": "readme"}).find("h1").find("a")["id"]
        titleArr = title.split('-') 
        title = titleArr[2]+'_'+titleArr[3]
    
        # dropTableSQL = "DROP TABLE IF EXISTS %s" % title
        # cursor.execute(dropTableSQL)
        isExisted = "show tables like '%s'" % title
        cursor.execute(isExisted)
        results = cursor.fetchall()
    
        if results == ():
            createTableSQL ="""CREATE TABLE %s (
                id int auto_increment primary key,
                name text not null,
                href text not null 
                )""" % title
            cursor.execute(createTableSQL)
    
            elements = bs_obj.find("div",{"id": "readme"}).find_all("li")
            for element in elements:
                t = element.find("a")
                name = ''
                #name = t.contents[0].encode('utf-8')
                for content in t.contents:
                    name = name + content.encode('utf-8')
                name = name + element.contents[1].encode('utf-8')
                my_re_obj = requests.get(t["href"])
                my_bs_obj = BeautifulSoup(my_re_obj.text.encode("utf8"), "html.parser")
                my_elements = my_bs_obj.find("div",{"id": "primary"}).find("article").find("div",{"class": "entry-content"}).find("p").find("a")
                val = ((my_elements["href"].split('?',1))[1].split('=',1))[1]
                print name
                print val
                b_name = base64.b64encode(name)
                b_val = base64.b64encode(val)
                print b_name
                print b_val
                try:
                    sql = """insert into %s(name, href) values('%s', '%s')""" % (title, b_name, b_val)
                    cursor.execute(sql)
                    db.commit()
                except Exception as e:
                    # Rollback in case there is any error
                    print "执行MySQL: %s 时出错：%s" % (sql, e)
                    db.rollback()
            db.close()
            print('create finish!')
        else:
            db.close()
            print('%s existed!' % title)
    `
  
    constructor() {
    }
    ngAfterViewInit() {

    }
}
