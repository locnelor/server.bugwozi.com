import { Injectable } from '@nestjs/common';
import { TestEntity } from './test.entity';

@Injectable()
export class TestService {
    private id: number = 1;
    private strs = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBBNMM<!@#$%^&*()+_?><,./"
    getRanTest(
        ranStrLen = 100,
        num = 100000
    ) {
        const test = new TestEntity();
        test.id = this.id++;
        test.random = Math.random() * num;
        test.ranStr = new Array(Math.floor(Math.random() * ranStrLen)).fill(0).map(() => this.strs[Math.floor(Math.random() * this.strs.length)]).join("");
        return test;
    }
}
