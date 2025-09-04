"use client"

import { useState, useRef } from 'react'
import {
  Trash2,
  Download,
  Archive,
  CheckCircle,
  ArrowLeft,
  Check,
  X,
  Search,
  Pencil
} from 'lucide-react'
import {
  Button,
  Typography,
  Breadcrumb,
  Snackbar,
  Alert,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Radio,
  Switch
} from '@/components'

export default function NoticeDetailPage() {
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info')
  const [normalInput, setNormalInput] = useState('')
  const [contentInput, setContentInput] = useState('')
  const [publishStatus, setPublishStatus] = useState<'Y' | 'N'>('Y')
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set())
  const [isEditable, setIsEditable] = useState(true)

  // 필수 입력 검증 상태
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')

  // 파일 용량 계산 함수
  const getTotalSize = (files: File[]) =>
    files.reduce((acc, file) => acc + file.size, 0);

  // 파일 용량 포맷 함수
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
  };

  // 파일 추가 핸들러
  const handleAddFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    // 중복 제거 (이름+사이즈 기준)
    setFiles(prev => {
      const prevArr = Array.from(prev);
      const newArr = Array.from(newFiles);
      const merged = [...prevArr];
      newArr.forEach(f => {
        if (!prevArr.some(p => p.name === f.name && p.size === f.size)) {
          merged.push(f);
        }
      });
      return merged;
    });
    // 새 파일 추가 시 선택 상태 초기화
    setSelectedFiles(new Set());
  };

  // 파일 삭제 핸들러 (단일)
  const handleRemoveFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // 전체 삭제
  const handleRemoveAll = () => setFiles([]);

  // 파일 선택 핸들러
  const handleSelectFile = (idx: number) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map((_, idx) => idx)));
    }
  };

  // 선택된 파일들 삭제
  const handleRemoveSelected = () => {
    setFiles(prev => prev.filter((_, idx) => !selectedFiles.has(idx)));
    setSelectedFiles(new Set());
  };

  // 전체 파일 다운로드 (개별)
  const handleDownloadAll = () => {
    files.forEach((file, index) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  };

  // 전체 파일 다운로드 (ZIP)
  const handleDownloadAllZip = async () => {
    // JSZip 라이브러리가 필요합니다. 실제 구현 시에는 npm install jszip 필요
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      files.forEach((file, index) => {
        zip.file(file.name, file);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'files.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('ZIP 다운로드 실패:', error);
      alert('ZIP 다운로드에 실패했습니다.');
    }
  };

  // 선택된 파일들 다운로드
  const handleDownloadSelected = () => {
    if (selectedFiles.size === 0) {
      alert('다운로드할 파일을 선택해주세요.');
      return;
    }

    selectedFiles.forEach(index => {
      const file = files[index];
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  };

  // 드래그&드롭 핸들러
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  // 필수 입력 검증 함수
  const validateRequiredFields = () => {
    let isValid = true;

    // 수정가능 모드일 때만 검증
    if (isEditable) {
      // 공지 제목 검증
      if (!normalInput.trim()) {
        setTitleError('공지 제목은 필수 입력값입니다.');
        isValid = false;
      } else {
        setTitleError('');
      }

      // 공지 내용 검증
      if (!contentInput.trim()) {
        setContentError('공지 내용은 필수 입력값입니다.');
        isValid = false;
      } else {
        setContentError('');
      }
    } else {
      // 읽기 전용 모드일 때는 에러 메시지 초기화
      setTitleError('');
      setContentError('');
    }

    return isValid;
  };

  // 입력값 변경 핸들러 (실시간 검증)
  const handleTitleChange = (value: string) => {
    setNormalInput(value);
    if (isEditable && !value.trim()) {
      setTitleError('공지 제목은 필수 입력값입니다.');
    } else {
      setTitleError('');
    }
  };

  const handleContentChange = (value: string) => {
    setContentInput(value);
    if (isEditable && !value.trim()) {
      setContentError('공지 내용은 필수 입력값입니다.');
    } else {
      setContentError('');
    }
  };

  // 편집 모드 변경 핸들러
  const handleEditableChange = (checked: boolean) => {
    setIsEditable(checked);
    // 편집 모드가 변경될 때 검증 상태 초기화
    if (!checked) {
      setTitleError('');
      setContentError('');
    } else {
      // 편집 모드로 변경될 때 현재 값 검증
      validateRequiredFields();
    }
  };

  return (
    <div
      className={`flex flex-col h-full min-h-0 ${isEditable ? 'editable' : 'readonly'}`}
      style={{
        height: 'calc(100vh - 3rem)', // 1.5rem top + 1.5rem bottom (space-y-6 = 1.5rem*2)
      }}
    >
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공지사항 상세</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '공지사항', href: '/' },
              { label: '공지사항 상세', active: true }
            ]}
          />
        </div>
      </div>
      {/* bottom-contents-pannel */}
      <div className="c-panel bottom-contents-pannel relative">
        <div className="bottom-contents-pannel__content mb-14" style={{ overflowY: 'auto', maxHeight: '100%' }}>
          <div className="flex items-center justify-between mb-2">
            <Typography variant="subtitle1" className="font-semibold text-gray-900">
              기본 정보
            </Typography>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">편집 모드 확인용</span>
              <Switch
                checked={isEditable}
                onChange={(e) => handleEditableChange(e.target.checked)}
                size="small"
              />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <TableContainer component={Paper} className="table-header-left">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label required">공지 제목</label></TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="공지 제목 입력"
                        fullWidth
                        value={normalInput}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        error={!!titleError}
                        helperText={titleError}
                        InputProps={{
                          readOnly: !isEditable,
                          endAdornment: normalInput && isEditable ? (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="입력값 지우기"
                                size="small"
                                onClick={() => handleTitleChange('')}
                                edge="end"
                              >
                                <X size={16} />
                              </IconButton>
                            </InputAdornment>
                          ) : undefined
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label required">공지 내용</label></TableCell>
                    <TableCell>
                      {/* MUI HTML 에디터 (예: MUI의 TextField + multiline, 또는 실제 HTML 에디터 라이브러리 사용) */}
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="공지 내용을 입력하세요"
                        fullWidth
                        value={contentInput}
                        onChange={(e) => handleContentChange(e.target.value)}
                        error={!!contentError}
                        helperText={contentError}
                        multiline
                        minRows={20}
                        maxRows={1000}
                        InputProps={{
                          readOnly: !isEditable,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">게시 여부</label></TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center gap-0">
                        <FormControlLabel
                          control={<Radio size="small" disabled={!isEditable} />}
                          label="게시"
                          value="Y"
                          checked={publishStatus === "Y"}
                          onChange={() => setPublishStatus("Y")}
                        />
                        <FormControlLabel
                          control={<Radio size="small" disabled={!isEditable} />}
                          label="게시안함"
                          value="N"
                          checked={publishStatus === "N"}
                          onChange={() => setPublishStatus("N")}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}>
                      <label className="form-side-label">첨부파일</label>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {/* 상단: 파일 정보 및 버튼 */}
                        <div className="flex flex-row justify-between items-center w-full">
                          {/* 왼쪽: 파일 개수/용량 */}
                          <div className="text-sm text-gray-700">
                            총 {files.length}개 / {formatBytes(getTotalSize(files))}
                            {selectedFiles.size > 0 && (
                              <span className="ml-2 text-blue-600">
                                (선택: {selectedFiles.size}개)
                              </span>
                            )}
                          </div>
                          {/* 오른쪽: 버튼들 */}
                          <div className="flex flex-row gap-1">
                            {/* 편집 모드에서만 표시되는 버튼들 */}
                            {isEditable && (
                              <>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  component="label"
                                  disabled={!isEditable}
                                  startIcon={<Search size={16} />}
                                >
                                  파일찾기
                                  <input
                                    type="file"
                                    hidden
                                    multiple
                                    ref={fileInputRef}
                                    onChange={e => {
                                      handleAddFiles(e.target.files);
                                      if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                  />
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="secondary"
                                  disabled={selectedFiles.size === 0 || !isEditable}
                                  onClick={handleRemoveSelected}
                                  startIcon={<Trash2 size={16} />}
                                >
                                  선택삭제
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="error"
                                  disabled={files.length === 0 || !isEditable}
                                  onClick={handleRemoveAll}
                                  startIcon={<Trash2 size={16} />}
                                >
                                  전체삭제
                                </Button>
                              </>
                            )}

                            {/* 읽기 전용 모드에서만 표시되는 버튼들 */}
                            {!isEditable && (
                              <>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  disabled={files.length === 0}
                                  onClick={handleDownloadAll}
                                  startIcon={<Download size={16} />}
                                >
                                  전체 다운로드
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  disabled={files.length === 0}
                                  onClick={handleDownloadAllZip}
                                  startIcon={<Archive size={16} />}
                                >
                                  전체 다운로드(zip)
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  disabled={selectedFiles.size === 0}
                                  onClick={handleDownloadSelected}
                                  startIcon={<CheckCircle size={16} />}
                                >
                                  선택파일 다운로드
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        {/* 파일 리스트 */}
                        {files.length > 0 && (
                          <div className="flex flex-col gap-1 mb-1">
                            {/* 전체 선택 헤더 */}
                            <div className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedFiles.size === files.length && files.length > 0}
                                  onChange={handleSelectAll}
                                  className="w-4 h-4"
                                />
                                <span>전체 선택</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {selectedFiles.size} / {files.length}
                              </span>
                            </div>
                            {/* 개별 파일들 */}
                            {files.map((file, idx) => (
                              <div
                                key={file.name + file.size + idx}
                                className="flex items-center justify-between px-2 py-1 bg-gray-50 rounded text-sm"
                              >
                                <div className="flex items-center gap-2 flex-1">
                                  <input
                                    type="checkbox"
                                    checked={selectedFiles.has(idx)}
                                    onChange={() => handleSelectFile(idx)}
                                    className="w-4 h-4"
                                  />
                                  <span className="truncate max-w-xs">{file.name} ({formatBytes(file.size)})</span>
                                </div>
                                <Button
                                  size="small"
                                  color="secondary"
                                  variant="text"
                                  onClick={() => handleRemoveFile(idx)}
                                  disabled={!isEditable}
                                >
                                  삭제
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* 하단: 드래그 앤 드롭 영역 (편집 모드에서만 표시) */}
                        {isEditable && (
                          <div
                            style={{
                              width: '100%',
                              height: 80,
                              border: '2px dashed #bdbdbd',
                              borderRadius: 8,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: isEditable ? '#fafafa' : '#f5f5f5',
                              cursor: isEditable ? 'pointer' : 'not-allowed',
                              opacity: isEditable ? 1 : 0.6,
                            }}
                            onDragOver={isEditable ? handleDragOver : undefined}
                            onDragLeave={isEditable ? handleDragLeave : undefined}
                            onDrop={isEditable ? handleDrop : undefined}
                            onClick={isEditable ? () => fileInputRef.current?.click() : undefined}
                          >
                            <span className="text-gray-500 text-sm">
                              파일을 이곳에 드래그 앤 드롭 하세요
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex items-center mb-2">
            <TableContainer component={Paper} className="table-header-left">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">작성자</label></TableCell>
                    <TableCell><Typography variant="body2">asfgasf</Typography></TableCell>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">작성일시</label></TableCell>
                    <TableCell><Typography variant="body2">2021-03-27 09:12</Typography></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">최종수정자</label></TableCell>
                    <TableCell><Typography variant="body2">asfgasf</Typography></TableCell>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">최종 수정일자</label></TableCell>
                    <TableCell><Typography variant="body2">2021-03-27 09:12</Typography></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* 카드 하단 고정 버튼 영역 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div>
              {isEditable && (
                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  startIcon={<Trash2 size={16} />}
                >
                  삭제
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                startIcon={<ArrowLeft size={16} />}
              >
                목록
              </Button>
              {isEditable ? (
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  startIcon={<Check size={16} />}
                  onClick={() => {
                    if (validateRequiredFields()) {
                      // 저장 로직 실행
                      setAlertMessage('저장되었습니다.');
                      setAlertSeverity('success');
                      setAlertOpen(true);
                    } else {
                      setAlertMessage('필수 입력값을 확인해주세요.');
                      setAlertSeverity('error');
                      setAlertOpen(true);
                    }
                  }}
                >
                  저장
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  startIcon={<Pencil size={16} />}
                  onClick={() => setIsEditable(true)}
                >
                  수정
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MUI Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: '20px !important',
          '& .MuiAlert-root': {
            minWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px'
          }
        }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{
            width: '100%',
            '& .MuiAlert-message': {
              fontWeight: 500
            }
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
} 
