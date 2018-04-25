<div class="module-user-edit layui-form">
    <div class="hs-align-right table-search ">
        <div class="layui-inline hs-float-left element-title">
            <a class="m-hover-href" href="#project-list" title="返回项目列表">项目列表</a>
            <span>/ {{d.pname}} / </span>
            <a class="m-hover-href" href="#project-user?pname={{d.pname}}&pid={{d.pid}}" title="人员列表">人员列表/ </a>
            <span>
                <cite>编辑人员</cite>
            </span>
        </div>
        
        <div class="layui-inline">
            <div class="layui-btn layui-btn-primary module-go-back">取消</div>
        </div>
        <div class="layui-inline">
            <div id="addUser" class="layui-btn layui-btn-normal" lay-submit="element-submit" lay-filter="element-submit">保存</div>
        </div>
    </div>

    <div class="m-add-content">
        
        <div class="m-title">基础信息：</div>
        <div class="m-content-list el-base-info">
            <div class="el-head-img">
                <img src="{{d.userData.facepath}}" alt="">
                <div id="takePhoto" class="layui-btn layui-btn-normal">更换照片</div>
            </div>
            <div class="el-info-detail">
                <div class="layui-form-item">
                    <div class="layui-input-inline">
                        <label class="layui-form-label">姓名</label>
                        <div class="layui-input-inline">
                            <input type="text" id="name" name="name" class="layui-input" lay-verify="name|required" placeholder="请选择姓名" value="{{d.userData.name}}">
                        </div>
                    </div>
                    
                    <div class="layui-input-inline">
                        <label class="layui-form-label">性别</label>
                        <div class="layui-input-inline">
                            <select name="sex" id="sex" lay-filter="sex">
                                <option value="1" {{d.userData.sex == 1?' selected':''}}>男</option>
                                <option value="0" {{d.userData.sex == 0?' selected':''}}>女</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="layui-input-inline">
                        <label class="layui-form-label">名族</label>
                        <div class="layui-input-inline" lay-filter="nationFilter">
                            <select id="nation" name="nation" lay-filter="nation" lay-verify="nation|required" lay-search>
                                <option value="">请选择名族</option>
                            </select>
                        </div>
                    </div>

                    <div class="layui-input-inline">
                        <label class="layui-form-label">身份证号</label>
                        <div class="layui-input-inline">
                            <input type="text" id="idcard" name="idcard" class="layui-input" lay-verify="required|idcard" placeholder="请输入身份证号码" value="{{d.userData.idcard}}" >
                        </div>
                    </div>
                </div>
                
                <div class="layui-form-item">
                    <div class="layui-input-inline">
                        <label class="layui-form-label">联系方式</label>
                        <div class="layui-input-inline">
                            <input type="text" id="tel" name="tel" class="layui-input" lay-verify="tel|required" placeholder="请输入联系方式，如手机号" value="{{d.userData.tel}}" >
                        </div>
                    </div>
                
                    <div class="layui-input-inline">
                        <label class="layui-form-label">紧急联系人姓名</label>
                        <div class="layui-input-inline">
                            <input type="text" id="urgencyperson" name="urgencyperson" class="layui-input" lay-verify="urgencyperson|required" placeholder="请输入紧急联系人姓名" value="{{d.userData.urgencyperson}}">
                        </div>
                    </div>
                
                    <div class="layui-input-inline">
                        <label class="layui-form-label">紧急联系人联系方式</label>
                        <div class="layui-input-inline">
                            <input type="text" id="urgencytel" name="urgencytel" class="layui-input" lay-verify="urgencytel|required" placeholder="请输入紧急联系人联系方式" value="{{d.userData.urgencytel}}">
                        </div>
                    </div>
                </div>

                <label class="layui-form-label">
                    家庭地址
                </label>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <div class="layui-input-inline layui-form layui-sp-select" lay-filter="provinceFilter">
                            <select name="province" lay-filter="province" lay-search>
                                <option value="">请选择省</option>
                            </select>
                        </div>
                        <div class="layui-input-inline layui-form layui-sp-select" lay-filter="cityFilter">
                            <select name="city" lay-filter="city" lay-search>
                                <option value="">请选择市</option>
                            </select>
                        </div>
                        <div class="layui-input-inline layui-form layui-sp-select" lay-filter="areaFilter">
                            <select name="area" lay-filter="area" lay-search>
                                <option value="">请选择县/区</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div class="layui-input-block">
                        <input type="text" id="address" name="address" class="layui-input" lay-verify="address|required" placeholder="请输入家庭详细地址" value="{{d.shortaddress || ''}}">
                    </div>
                </div>

            </div>
        </div>

        <div class="m-title">工作信息：</div>
        <div class="m-content-list">
            <div class="layui-form-item">
                <div class="layui-input-inline">
                    <label class="layui-form-label">工作类型</label>
                    <div class="layui-input-inline">
                        <!-- 人员类型（1:工人、2:管理、3:其他） -->
                        <select name="employeetype" id="employeetype" lay-filter="employeetype|required"></select>
                    </div>
                </div>
            
                <div class="layui-input-inline">
                    <label class="layui-form-label">所在企业</label>
                    <div class="layui-input-inline" lay-filter="enterpriseFilter">
                        <select name="enterprise" id="enterprise" lay-filter="enterprise|required" lay-search="">
                            <option value="1">请选择</option>
                        </select>
                    </div>
                </div>
            
                <div class="layui-input-inline">
                    <label class="layui-form-label">所在班组</label>
                    <div class="layui-input-inline" lay-filter="belongclassFilter">
                        <select name="belongclass" id="belongclass" lay-filter="belongclass|required" lay-search="">
                            <option value="1">请选择</option>
                        </select>
                    </div>
                </div>
            
                <div class="layui-input-inline">
                    <label class="layui-form-label">所属工种</label>
                    <div class="layui-input-inline" lay-filter="worktypeFilter">
                        <select name="worktype" id="worktype" lay-filter="worktype" lay-search="">
                            <option value="1">请选择</option>
                        </select>
                    </div>
                </div>

                <div class="layui-input-inline">
                    <label class="layui-form-label">宿舍编号</label>
                    <div class="layui-input-inline">
                        <input type="text" id="dormitorynumber" name="dormitorynumber" class="layui-input" lay-verify="dormitorynumber|required" placeholder="请输入宿舍编号" value="{{d.userData.dormitorynumber}}">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-input-inline">
                    <label class="layui-form-label">床位编号</label>
                    <div class="layui-input-inline">
                        <input type="text" id="bednumber" name="bednumber" class="layui-input" lay-verify="bednumber|required" placeholder="请输入床位编号" value="{{d.userData.bednumber}}">
                    </div>
                </div>
            
                <div class="layui-input-inline">
                    <label class="layui-form-label">安全教育日期</label>
                    <div class="layui-input-inline">
                        <input type="text" id="secureeducationdate" name="secureeducationdate" class="layui-input" lay-verify="secureeducationdate|required" placeholder="请选择安全教育日期" value="{{d.userData.secureeducationdate}}">
                    </div>
                </div>
            
                <div class="layui-input-inline">
                    <label class="layui-form-label">在职状态</label>
                    <div class="layui-input-inline">
                        <select name="status" id="status" lay-filter="status">
                            <option value="1" {{d.userData.status == 1?' selected':''}}>在职</option>
                            <option value="0" {{d.userData.status == 0?' selected':''}}>离职</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="m-title">项目信息：</div>
        <div class="m-content-list">
            <div class="layui-form-item">
                <div class="layui-input-inline">
                    <label class="layui-form-label">所在项目</label>
                    <div class="layui-input-inline">
                        <input type="text" id="currentprojectName" name="currentprojectName" class="layui-input" value="{{d.pname}}" readonly>
                        <input type="hidden" name="currentproject" lay-verify="required" value="{{d.pid}}">
                    </div>
                </div>
            
                <div class="layui-input-inline">
                    <label class="layui-form-label">加入项目时间</label>
                    <div class="layui-input-inline">
                        <input type="text" id="enterprojecttime" name="enterprojecttime" class="layui-input" lay-verify="enterprojecttime|required" value="{{d.userData.enterprojecttime}}">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
