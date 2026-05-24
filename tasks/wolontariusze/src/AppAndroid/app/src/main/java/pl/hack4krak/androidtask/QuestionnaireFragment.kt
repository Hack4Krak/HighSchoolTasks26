package pl.hack4krak.androidtask

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import pl.hack4krak.androidtask.databinding.FragmentQuestionnaireBinding
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import kotlin.system.exitProcess

class QuestionnaireFragment : Fragment() {

    private var _binding: FragmentQuestionnaireBinding? = null
    private val binding get() = _binding!!

    private val questions = listOf(
        R.string.q1, R.string.q2, R.string.q3, R.string.q4, R.string.q5,
        R.string.q6, R.string.q7, R.string.q8, R.string.q9, R.string.q10,
        R.string.q11, R.string.q12, R.string.q13, R.string.q14, R.string.q15,
        R.string.q16, R.string.q17, R.string.q18, R.string.q19, R.string.q20,
        R.string.q21, R.string.q22, R.string.q23, R.string.q24, R.string.q25,
        R.string.q26, R.string.q27, R.string.q28, R.string.q29, R.string.q30,
        R.string.q31, R.string.q32, R.string.q33, R.string.q34, R.string.q35,
        R.string.q36, R.string.q37, R.string.q38, R.string.q39, R.string.q40,
        R.string.q41, R.string.q42, R.string.q43, R.string.q44, R.string.q45,
        R.string.q46, R.string.q47, R.string.q48, R.string.q49, R.string.q50,
        R.string.q51, R.string.q52, R.string.q53, R.string.q54, R.string.q55,
        R.string.q56, R.string.q57, R.string.q58, R.string.q59, R.string.q60,
        R.string.q61, R.string.q62, R.string.q63, R.string.q64, R.string.q65,
        R.string.q66, R.string.q67, R.string.q68, R.string.q69, R.string.q70,
        R.string.q71, R.string.q72, R.string.q73, R.string.q74, R.string.q75,
        R.string.q76, R.string.q77, R.string.q78, R.string.q79, R.string.q80,
        R.string.q81, R.string.q82, R.string.q83, R.string.q84, R.string.q85,
        R.string.q86, R.string.q87, R.string.q88, R.string.q89, R.string.q90,
        R.string.q91, R.string.q92, R.string.q93, R.string.q94, R.string.q95,
        R.string.q96, R.string.q97, R.string.q98, R.string.q99, R.string.q100
    ).shuffled()

    private var currentQuestionIndex = 0
    private var totalQuestionsAnswered = 0
    private val answers = mutableListOf<Pair<String, String>>()
    private var userName = ""
    private var userAge = ""
    private var userEmail = ""
    private var userCity = ""

    private val syncUrl = URL("https://wolontariusze.hack4krak.pl/submit")
    private val tag = "H4KAndroid"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            userName = it.getString("name", "")
            userAge = it.getString("age", "")
            userEmail = it.getString("email", "")
            userCity = it.getString("city", "")
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentQuestionnaireBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        showQuestion()

        binding.submitAnswerBtn.setOnClickListener {
            val answer = binding.answerInput.text?.toString()?.trim() ?: ""
            if (answer.length < 12) {
                binding.answerInput.error = "Napisz tam coś..."
                return@setOnClickListener
            }

            val questionText = getString(questions[currentQuestionIndex])
            answers.add(questionText to answer)
            totalQuestionsAnswered++
            currentQuestionIndex = (currentQuestionIndex + 1) % questions.size

            binding.answerInput.text?.clear()

            if (totalQuestionsAnswered % 5 == 0) {
                syncAnswers()
            } else {
                showQuestion()
            }
        }
    }

    private fun showQuestion() {
        val resId = questions[currentQuestionIndex]
        binding.questionText.text = getString(resId)
    }

    private fun syncAnswers() {
        binding.submitAnswerBtn.isEnabled = false

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val jsonAnswers = answers.map { (question, answer) ->
                    JSONObject().apply {
                        put("question", question)
                        put("answer", answer)
                    }
                }.toList()

                val payload = JSONObject().apply {
                    put("name", userName)
                    put("age", userAge)
                    put("city", userCity)
                    put("total", totalQuestionsAnswered)
                    put("answers", JSONArray(jsonAnswers))
                }

                val connection = syncUrl.openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.doOutput = true
                connection.setRequestProperty("Content-Type", "application/json")
                connection.connectTimeout = 5000
                connection.readTimeout = 5000

                OutputStreamWriter(connection.outputStream).use { writer ->
                    writer.write(payload.toString())
                    writer.flush()
                }

                val responseCode = connection.responseCode
                connection.disconnect()

                withContext(Dispatchers.Main) {
                    if (responseCode != 200) {
                        val errorMsg = getString(R.string.sync_error)
                        Snackbar.make(requireView(), errorMsg, Snackbar.LENGTH_INDEFINITE).show()
                        exitProcess(67)
                    }
                    Toast.makeText(requireContext(), getString(R.string.sync_success), Toast.LENGTH_SHORT).show()
                    answers.clear()
                    binding.submitAnswerBtn.isEnabled = true
                    showQuestion()
                }
            } catch (e: Exception) {
                Log.e(tag, e.toString())
                withContext(Dispatchers.Main) {
                    val errorMsg = getString(R.string.sync_error)
                    Snackbar.make(requireView(), errorMsg, Snackbar.LENGTH_INDEFINITE).show()
                    exitProcess(69)
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
